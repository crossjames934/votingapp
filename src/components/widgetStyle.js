module.exports = (order, showing) => {
    return {
        order,
        display: (showing ? "block" : "none"),
        animation: `appear 1s ease-out ${order*100}ms forwards`
    };
};