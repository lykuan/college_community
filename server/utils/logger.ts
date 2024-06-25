import winston from "winston"
const { combine, timestamp, prettyPrint,simple } = winston.format
export const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    simple(),
    prettyPrint(),
  ),
  transports: [
    new winston.transports.File({ filename: "logs/application.log" }),
  ],
})

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
