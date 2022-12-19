import fs from 'fs'

let filetree = {}

const walkDirectory = (dir, obj) => {
  const files = fs.readdirSync(dir)

  for (const key in files) {
    if (!files.hasOwnProperty(key)) continue

    const file = files[key]
    const target = `${dir}/${file}`
    const stats = fs.statSync(target)

    if (stats.isFile()) {
      if (file.endsWith('.json')) {
        obj['data'] = JSON.parse(fs.readFileSync(target))
      }
    } else if (stats.isDirectory()) {
      obj[file] = {}
      walkDirectory(target, obj[file])
    }
  }
}

walkDirectory('./json', filetree)
console.log(JSON.stringify(filetree, null, 2))
