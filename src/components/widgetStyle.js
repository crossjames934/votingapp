module.exports = (order, showing) => {
    return {
        order,
        display: (showing ? "block" : "none"),
        minWidth: "30vw",
        maxWidth: "380px",
        animation: `appear 1s ease-out ${order*100}ms forwards`
    };
};