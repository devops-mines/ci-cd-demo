document.addEventListener('DOMContentLoaded', () => {
    const statusIndicator = document.getElementById('status-indicator');
    const pulse = statusIndicator.querySelector('.pulse');
    const statusText = document.getElementById('status-text');
    const apiResponse = document.getElementById('api-response');
    const refreshBtn = document.getElementById('refresh-btn');

    const fetchStatus = async () => {
        // Reset to loading state
        pulse.className = 'pulse';
        statusText.textContent = 'Checking connection...';
        apiResponse.innerHTML = '<span style="opacity: 0.5">Fetching data from API...</span>';
        
        try {
            // Add a small artificial delay to show the loading animation
            await new Promise(resolve => setTimeout(resolve, 800));
            
            const response = await fetch('/api/status');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await fetch('/api/status').then(res => res.json());
            
            // Success state
            pulse.className = 'pulse success';
            statusText.textContent = 'Connected to Backend';
            statusText.style.color = '#10B981';
            
            // Format JSON nicely
            apiResponse.innerHTML = `<pre style="color: #6EE7B7; margin: 0;">${JSON.stringify(data, null, 2)}</pre>`;
            
        } catch (error) {
            // Error state
            pulse.className = 'pulse error';
            statusText.textContent = 'Connection Failed';
            statusText.style.color = '#EF4444';
            apiResponse.innerHTML = `<span style="color: #FCA5A5;">Error: ${error.message}</span><br><br><span style="font-size: 0.8em; opacity: 0.7">Make sure the backend server is running.</span>`;
            console.error('API Error:', error);
        }
    };

    // Initial fetch
    fetchStatus();

    // Attach to button
    refreshBtn.addEventListener('click', () => {
        // Add a little click animation to the button
        refreshBtn.style.transform = 'scale(0.95)';
        setTimeout(() => refreshBtn.style.transform = '', 150);
        
        fetchStatus();
    });
});
