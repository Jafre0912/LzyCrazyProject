import React from 'react';

function ResultsScreen({ mode, results, onProceed }) {
  const label = mode === 'whatsapp' ? 'Number' : 'Email';
  const activeLabel = mode === 'whatsapp' ? 'Active WhatsApp Numbers' : 'Active Email';

  if (!results) {
    return <div className="results-card">Loading results...</div>;
  }

  return (
    <div>
      <div className="upload-form-top-bar">
        <div className="country-select-wrapper">
          <h2 className="component-title">Select Country</h2>
          <div className="country-select">
            <img src="https://flagcdn.com/w40/in.png" alt="India Flag" />
            <span>India</span>
          </div>
        </div>
        <div className="action-buttons">
          <button>Follow Up Calls</button>
          <button>Chat History</button>
        </div>
      </div>

      <div className="results-card">
        <h3>{results.total} Total {label}</h3>
        <div className="result-item">
          <span>Total No List Remove Wrong {label}s</span>
          <div>
            <span className="count">{results.removedWrong}</span>
            <span className="icon-remove"> ✘</span>
          </div>
        </div>
        <div className="result-item">
          <span>Total No List Remove Same {label}s</span>
          <div>
            <span className="count">{results.removedSame}</span>
            <span className="icon-remove"> ✘</span>
          </div>
        </div>
        <div className="result-item">
          <span>Total No LzyCrazy {label}s</span>
          <div>
            <span className="count">{results.lazyCrazy}</span>
            <span className="icon-remove"> ✘</span>
          </div>
        </div>
        {mode === 'whatsapp' && (
          <div className="result-item">
            <span>Total No List Text {label}s</span>
            <span className="count">{results.textNumbers}</span>
          </div>
        )}
        <div className="result-item success">
          <span>Total {activeLabel}</span>
          <span className="count">{results.active}</span>
        </div>
      </div>

      <button className="proceed-button" onClick={onProceed}>
        Proceed to Send Message
      </button>
    </div>
  );
}

export default ResultsScreen;