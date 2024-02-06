const {ClickHouse} = require('clickhouse');
require("dotenv").config(); 

const clickhouse = new ClickHouse({
    url: process.env.CLICKHOUSE_URL,
    port: 8443, // Default ClickHouse port
    username: process.env.CLICKHOUSE_USERNAME,
    password: process.env.CLICKHOUSE_PASSWORD,
    basicAuth: null, // Or use basicAuth for HTTP authentication
    isUseGzip: true,
    format: "json",
    raw: false,
    config: {
        session_timeout: 500,
        output_format_json_quote_64bit_integers: false,
    },
});

module.exports = clickhouse;

// const rows = [];rows.push(row);