export const federationsApi = {
    async list() {
        const response = await fetch('https://md.tiw.incubator.geant.org/md/ra.json');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // make a delay to simulate a network request
        await new Promise(resolve => setTimeout(resolve, 500));
        const data = await response.json();

        // Ensure data is an array
        return data ? Object.entries(data).map(([url, details]) => ({
            url,
            isActive: JSON.parse(localStorage.getItem('activeFederations') || '[]').includes(url),
            ...details
        })) : [];
    },


    async update({ id, status }) {
        await new Promise(resolve => setTimeout(resolve, 300));
        // Simulate updating the federation status
        console.log(`Federation ${id} status updated to ${status}`);

        // Update localStorage
        const activeFederations = JSON.parse(localStorage.getItem('activeFederations') || '[]');
        if (status) {
            activeFederations.push(id);
        } else {
            const index = activeFederations.indexOf(id);
            if (index > -1) {
                activeFederations.splice(index, 1);
            }
        }
        localStorage.setItem('activeFederations', JSON.stringify(activeFederations));
    }
}