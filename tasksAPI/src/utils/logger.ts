import winston from "winston";
import config from "../config";
import fs from "fs";
import { format } from "logform";

// ideally get it from config file
const logDirectory: string = config.LOG_DIR || "./log";
const logLevel = config.LOG_LEVEL || "debug";
const serviceName = config.SERVICE_NAME || "-^^-";

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// check issue https://github.com/winstonjs/winston/issues/1140 for more details on what is going on here
const addContext = winston.format(info => {
    //add any generic info going into each log message
    info.serviceName = serviceName;
    return info;
});

const jsonWithTimeAndIp = format.combine(
    addContext(),
    format.timestamp(),
    format.json()
);

const consoleWithTimeAndIp = format.combine(
    addContext(),
    format.timestamp(),
    format.printf(info => `${info.timestamp} (${info.serviceName}) [${info.ips|| "-"}] [${info.level}] ${info.message}`),
);

const logger = winston.createLogger({
    level:  logLevel,
    transports: [
        new winston.transports.File({
            // level: 'info',
            filename: `${logDirectory}/tasks_${serviceName}.log`,
            handleExceptions: true,
            maxsize: 1048576, // 1MB
            maxFiles: 5,
            format: jsonWithTimeAndIp,
        }),
        new winston.transports.Console({
            // level: 'debug',
            handleExceptions: true,
            format: consoleWithTimeAndIp,
        }),
    ]
});

export default logger;
logger.debug(`Logging initialized at ${logLevel} level`);
