import './App.css';
import Header from './header';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CallTerminal() {
    const [messages, setMessages] = useState([]);
    const [recommendation, setRecommendation] = useState(null);
    const [recommendationMessages, setRecommendationMessages] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [showAll, setShowAll] = useState(false);

    const fetchRecommendations = async () => {
        try {
            const response = await axios.get('http://0.0.0.0:5050/fetch-recommendations');
            if (response.status === 200) {
                const recommendation_list = response.data.current_recommendations;
                return recommendation_list;
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
            setRecommendationMessages(currentRecommendation);
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

    return (
        <div className="relative flex flex-col h-screen">
            <Header />
            <div className="flex flex-col items-center mt-10 flex-grow">
                <h1 className="text-2xl font-bold mb-4">SalesLoft Call Assistant</h1>
                <div className="w-full max-w-4xl overflow-y-auto max-h-[80vh] p-4">
                    <button
                        onClick={handleToggleAll}
                        className="absolute top-4 right-4 px-3 py-1 text-sm bg-green-500 text-white rounded"
                    >
                        {showAll ? 'Collapse Details' : 'Topic Details'}
                    </button>
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
                                    <div className="h-6 w-6 border-2 border-green-500 rounded-full mr-2"></div>
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
                                        <div>{item.message}</div>
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
        </div>
    );
}

export default CallTerminal;
