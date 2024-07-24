import React from 'react';
import { Link } from 'react-router-dom';
import Header from './header';

const data = [
    { theme: "Too many tools", mentions: 150, trend: "up" },
    { theme: "Context Switching", mentions: 120, trend: "up" },
    { theme: "AI Ethics", mentions: 66, trend: "down" },
    { theme: "Generative AI", mentions: 52, trend: "down" },
    { theme: "Hallucination", mentions: 42, trend: "up" }
];

const TopicAnalysis = () => {
    const getTrendArrow = (trend) => {
        return trend === 'up' ? '↑' : '↓';
    };

    const getTrendColor = (trend) => {
        return trend === 'up' ? 'text-green-500' : 'text-red-500';
    };

    return (
        <div>
            <Header />
            <div className="App flex flex-col items-center mt-10">
                <h1 className="text-2xl font-bold mb-4">SalesLoft Call Theme Analysis</h1>
                <div className="w-full max-w-2xl">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 border-b text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                    Theme
                                </th>
                                <th className="px-6 py-3 border-b text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                    Mentions
                                </th>
                                <th className="px-6 py-3 border-b text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                    Trend
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                                        <Link 
                                            to={`/call-theme/${encodeURIComponent(item.theme)}`}
                                            className="text-blue-600 hover:text-blue-800 hover:underline"
                                        >
                                            {item.theme}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">
                                        {item.mentions}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">
                                        <span className={`font-bold ${getTrendColor(item.trend)}`}>
                                            {getTrendArrow(item.trend)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TopicAnalysis;