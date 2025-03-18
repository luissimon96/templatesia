import { createLogger, format, transports } from 'winston';

// Definir o ambiente com fallback
const nodeEnv = process.env.NODE_ENV || 'development';

const logger = createLogger({
  level: nodeEnv === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  defaultMeta: { service: 'templatesia-api' },
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    })
  ]
});

export default logger; 