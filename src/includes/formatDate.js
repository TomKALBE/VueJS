export default {
    formatDate: function(v) { 
        const dt = new Date(v);
        const date = dt.toLocaleDateString("fr") + " à " + dt.getHours() + "H" + dt.getMinutes();
        return date; 
    }
}