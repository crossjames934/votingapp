module.exports = (order, showing) => {
    return {
        order,
        display: (showing ? "block" : "none"),
        width: 400,
        animation: `appear 1s ease-out ${order*100}ms forwards`
    };
};