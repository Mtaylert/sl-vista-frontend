import './App.css';
import Header from './header';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CallTerminal() {
    const [messages, setMessages] = useState([]);
    const [recommendation, setRecommendation] = useState(null);
    const [recommendationMessages, setRecommendationMessages] = useState([]);
    const [salesAchievement, setSalesAchievement] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);
    const [showAll, setShowAll] = useState(true);
    const [callEnded, setCallEnded] = useState(false); // New state for call end action
    const [isNextStepsModalOpen, setNextStepsModalOpen] = useState(false);


    const toggleNextStepsModal = () => {
        setNextStepsModalOpen(!isNextStepsModalOpen);
    };

    const fetchRecommendations = async () => {
        try {
            const response = await axios.get('http://0.0.0.0:5050/fetch-recommendations');
            if (response.status === 200) {
                return response.data;
            } else {
                console.error("Failed to fetch recommendations");
            }
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        }
    };

    useEffect(() => {
        const ws = new WebSocket('ws://0.0.0.0:5050/ws');

        ws.onopen = () => {
            console.log('WebSocket connection opened');
        };

        ws.onmessage = async (event) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
            console.log(event.data);
            const currentRecommendation = await fetchRecommendations();
            setRecommendationMessages(currentRecommendation.current_recommendations);
            setSalesAchievement(currentRecommendation.sales_checklist);
            setModalOpen(true);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            ws.close();
        };
    }, []);

    useEffect(() => {
        if (recommendation) {
            setModalOpen(true);
        }
    }, [recommendation]);

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleToggleAll = () => {
        setShowAll((prevShowAll) => !prevShowAll);
    };

    const endCall = () => {
        setCallEnded(true); // Set the state to indicate the call has ended
    };

    return (
        <div className="relative flex flex-col h-screen">
            <Header />
            <div className="flex flex-col items-center mt-10 flex-grow">
                <h1 className="text-2xl font-bold mb-4">SalesLoft Call Assistant</h1>
                <div className="flex w-full max-w-4xl overflow-y-auto max-h-[80vh] p-4">
                <div className="absolute top-4 right-4 flex space-x-4">
                    <button
                        onClick={handleToggleAll}
                        className="px-3 py-1 text-sm bg-green-500 text-white rounded"
                    >
                        {showAll ? 'Collapse Details' : 'Topic Details'}
                    </button>
                    <button
                        onClick={endCall}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                    >
                        End Call
                    </button>
                    <button
                        onClick={toggleNextStepsModal}
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                    >
                        Next Steps
                    </button>
                </div>
                    <ul className="list-disc list-inside space-y-4 mt-10">
                        {[
                            {
                                title: 'Building Rapport',
                                items: [
                                    'Introduce yourself and your company clearly.',
                                    'Use the customer\'s name.'
                                ]
                            },
                            {
                                title: 'Provide a reason for the call',
                                items: [
                                    'We spoke over the phone last week about how you can have your team quickly increase ROI.',
                                    'Mention new data analyzation feature that better tracks call outcomes.'
                                ]
                            },
                            {
                                title: 'Active Listening and Question Handling',
                                items: [
                                    'Summarize and reflect back what the buyer says.',
                                    'Listen well and let the buyer express their needs.',
                                    'Respond to questions with clarity and accuracy.'
                                ]
                            }
                        ].map((listItem, index) => (
                            <li key={index} className='flex flex-col'>
                                <div className='flex items-start mb-2'>
                                    {!callEnded ? (
                                        <div 
                                            className={`h-6 w-6 border-2 rounded-full mr-2 ${
                                                (listItem.title === 'Building Rapport' && salesAchievement.build_rapport) ||
                                                (listItem.title === 'Active Listening and Question Handling' && salesAchievement.active_listening)
                                                    ? 'bg-green-500'
                                                    : 'border-green-500'
                                            }`}
                                        ></div>
                                    ) : (
                                        <div 
                                            className={`h-6 w-6 mr-2 ${
                                                (listItem.title === 'Building Rapport' && salesAchievement.build_rapport) ||
                                                (listItem.title === 'Active Listening and Question Handling' && salesAchievement.active_listening)
                                                    ? 'bg-green-500 rounded-full'
                                                    : 'text-red-500 text-xl'
                                            }`}
                                        >
                                            {!(listItem.title === 'Building Rapport' && salesAchievement.build_rapport) &&
                                             !(listItem.title === 'Active Listening and Question Handling' && salesAchievement.active_listening) 
                                            && '✗'}
                                        </div>
                                    )}
                                    <span 
                                        className='font-bold bg-green-200 rounded-md p-1 cursor-pointer'
                                    >
                                        {listItem.title}
                                    </span>
                                </div>
                                {showAll && (
                                    <ul className="list-disc list-inside ml-8 space-y-2">
                                        {listItem.items.map((subItem, subIndex) => (
                                            <li key={subIndex} className='flex items-start before:content-["•"] before:mr-2 before:text-green-500'>
                                                {subItem}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {isModalOpen && (
                <div className={`fixed bottom-4 right-4 bg-slate-200 p-4 rounded shadow-lg z-50 modal ${isModalOpen ? 'show' : ''}`}>
                    <h2 className="text-xl font-bold mb-4">Sales Coach: <span className="text-green-500">({recommendationMessages.length} Recommendations)</span></h2>
                    <div className="max-h-40 overflow-y-auto">
                        {recommendationMessages.length > 0 ? (
                            <ul className="space-y-4">
                                {recommendationMessages.map((item, index) => (
                                    <li key={index} className="p-2 border-b border-gray-300">
                                        <div className="font-semibold">{item.label}: ({item.timestamp})</div>
                                        <div dangerouslySetInnerHTML={{ __html: item.message }} />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No recommendations available.</p>
                        )}
                    </div>
                    <button 
                        onClick={closeModal} 
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                    >
                        Close
                    </button>
                </div>
            )}
            {isNextStepsModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Next Steps</h3>
                        <div className="mt-2 flex flex-col space-y-3">
                        <button 
                            onClick={() => {/* Add logic for sending summary email */}} 
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center"
                        >
                            <span>Send Summary Email</span>
                            <span className="ml-2" title="AI-powered">✨</span>
                        </button>
                            <button onClick={() => {/* Add logic for scheduling next meeting */}} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                               <span>Schedule Next Meeting</span>
                    <span className="ml-2" title="Open calendar">📅</span>
                            </button>
                            <button onClick={toggleNextStepsModal} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CallTerminal;
