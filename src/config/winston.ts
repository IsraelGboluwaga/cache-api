import * as winston from "winston";
import * as rootPath from "app-root-path";

const timestamp: number = Date.now();
const options = {
  file: {
    level: "info",
    filename: `${rootPath}/logs/cache-${timestamp}.log`,
    handleExceptions: true,
    json: true,
    timestamp: true,
    maxsize: 2097152, // 2MB
    maxFiles: 5,
    colorize: false,
  },
  timestamp: true,
  console: {
    level: "info",
    timestamp: () => Date.now(),
    formatter: function (opts: any) {
      return (
        winston.config.colorize(opts.level, opts.timestamp()) +
        " " +
        winston.config.colorize(opts.level, opts.level.toUpperCase()) +
        " " +
        (opts.message ? opts.message : "") +
        (opts.meta && Object.keys(opts.meta).length
          ? "\n\t" + JSON.stringify(opts.meta)
          : "")
      );
    },
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = new winston.Logger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
  write: function (message: any, encoding: any) {
    logger.info(message, encoding);
  },
};

export { logger };
