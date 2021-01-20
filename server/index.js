/* eslint-disable */
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;

// Proxy endpoints
app.use('/api/', createProxyMiddleware({
    target: 'https://api.foldingathome.org',
    changeOrigin: true,
    secure: false,
    pathRewrite: {'^/api/' : ''},
}));
app.use('/api2/', createProxyMiddleware({
    target: 'https://api2.foldingathome.org',
    changeOrigin: true,
    secure: false,
    pathRewrite: {'^/api2/' : ''},
}));
app.use('/stats/', createProxyMiddleware({
    target: 'https://stats.foldingathome.org/',
    changeOrigin: true,
    secure: false,
    pathRewrite: {'^/stats/' : ''},
}));


// Start Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
