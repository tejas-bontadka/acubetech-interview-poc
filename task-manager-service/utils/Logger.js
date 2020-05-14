const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  transports: [
    new transports.Console({
      level: "error",
      format: format.combine(format.timestamp(), format.simple()),
    }),
    new transports.File({
      filename: "logging.log",
      level: "error",
      format: format.combine(format.timestamp(), format.simple()),
    }),
  ],
});

module.exports = logger;
