import chalk from "chalk";

interface LogLevel {
  level: string;
  color: (text: string) => string;
  emoji: string;
}

const LOG_LEVELS: Record<string, LogLevel> = {
  info: { level: "INFO", color: chalk.blue, emoji: "ℹ️" },
  warn: { level: "WARN", color: chalk.yellow, emoji: "⚠️" },
  error: { level: "ERROR", color: chalk.red, emoji: "❌" },
  debug: { level: "DEBUG", color: chalk.gray, emoji: "🔍" },
  success: { level: "SUCCESS", color: chalk.green, emoji: "✅" },
};

const setting = (message: string, level: string, source = "app") => {
  const now = new Date();
  const formatted = now.toISOString().replace("T", " ").replace("Z", " UTC");
  const prefix = chalk.gray(`[${source}]`);

  const logLevel = LOG_LEVELS[level] || LOG_LEVELS.info;
  const levelText = logLevel.color(`[${logLevel.level}]`);
  const emoji = logLevel.emoji;

  console.log(`${chalk.blue(formatted)} ${prefix} ${levelText} ${emoji} ${message}`);
};

const log = {
  info: (msg: string, src = "app") => setting(msg, "info", src),
  warn: (msg: string, src = "app") => setting(msg, "warn", src),
  error: (msg: string, src = "app") => setting(msg, "error", src),
  debug: (msg: string, src = "app") => {
    if (process.env.NODE_ENV === "development") {
      setting(msg, "debug", src);
    }
  },
  success: (msg: string, src = "app") => setting(msg, "success", src),
};

export default log;
