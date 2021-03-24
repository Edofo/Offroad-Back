import chalk from 'chalk'

export default function mlog(str, level = 'INFO') {

  const colors = {
    INFO: 'magenta',
    DEBUG: 'cyan',
    SUCCESS: 'green',
    ERROR: 'red'
  }

  const currentColor = colors[level]
  console.log(chalk[currentColor](str))
}
