import React from 'react';

// Dummy data to populate the list, since we are not reading the file yet
const dummyData = {
    whatsapp: [
        { id: 1, target: '+91 7457024841', type: 'WhatsApp', status: 'Valid', date: '14-07-2025', time: '14:58' },
        { id: 2, target: '+91 7457024842', type: 'WhatsApp', status: 'Valid', date: '14-07-2025', time: '14:58' },
        { id: 3, target: '+91 7457024843', type: 'WhatsApp', status: 'Valid', date: '14-07-2025', time: '14:58' },
    ],
    email: [
        { id: 1, target: 'test1@example.com', type: 'Email', status: 'Valid', date: '14-07-2025', time: '14:58' },
        { id: 2, target: 'test2@example.com', type: 'Email', status: 'Valid', date: '14-07-2025', time: '14:58' },
        { id: 3, target: 'test3@example.com', type: 'Email', status: 'Valid', date: '14-07-2025', time: '14:58' },
    ]
};

const whatsappTemplate = "Hello 👋\nThis is [Your Name] from [Your Business/Service Name].\nWe hope you're doing well! We wanted to personally reach out and let you know that we provide [Your Service/Products] in your area — with fast service, genuine support, and affordable rates.";

function SendScreen({ mode, onBack }) {
    const isEmail = mode === 'email';
    const data = isEmail ? dummyData.email : dummyData.whatsapp;
    const listHeader = isEmail ? 'Text Email 200' : 'WhatsApp 100';
    const columnHeader = isEmail ? 'Email Address' : 'Phone Number';

    return (
        <div className="send-screen-container">
            <div className="left-panel">
                <h3 className="list-header">{listHeader}</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>{columnHeader}</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.target}</td>
                                <td>{item.type}</td>
                                <td>{item.status}</td>
                                <td>{item.date}</td>
                                <td>{item.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="right-panel">
                <div className="composer">
                    {isEmail && (
                        <input type="text" placeholder="Subject" />
                    )}
                    <textarea 
                        placeholder="Type Here..."
                        defaultValue={isEmail ? '' : whatsappTemplate}
                    ></textarea>
                </div>
                <div className="send-options">
                    <label>
                        <i className="fas fa-paperclip"></i> Attach Image/
                    </label>
                    <label>
                        <input type="checkbox" /> Schedule
                    </label>
                </div>
                <div className="send-options">
                    <label>Target</label>
                    <label>
                        <input type="radio" name="target" defaultChecked /> All
                    </label>
                    <label>
                        <input type="radio" name="target" /> Selected Only
                    </label>
                </div>
                <button className="proceed-button">
                    Proceed to Send {isEmail ? 'Email' : 'Message'}
                </button>
                 <button className="back-button" onClick={onBack} style={{marginTop: '10px', background: '#555'}}>
                    Go Back
                </button>
            </div>
        </div>
    );
}

export default SendScreen;