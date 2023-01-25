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
// console.log(JSON.stringify(getDepth(filetree), null, 2))


let newObj = {}

function recursiveDepth(obj, depth = 0) {
  


  for (const item in obj) {
    newObj = obj[item]
    newObj.depth = depth

    if (obj.hasOwnProperty(item)) {
      recursiveDepth(obj[item], depth++)
    }
    //   if (typeof item === 'object' || typeof item === 'object') {
    //     obj[item].depth = depth
    //     console.log(obj[item])

    //     return obj
    //   } else {
    //     recursiveDepth(obj[item], depth + 1)
    //   }
    // }

    return newObj
  }

  console.log(obj)
  return obj
}

recursiveDepth(filetree)


function getDepth(obj){
  if(!obj || obj.length===0 || typeof(obj)!=="object") return 0;
  const keys = Object.keys(obj);
  let depth = 0;
  keys.forEach(key=>{
      let tmpDepth = getDepth(obj[key]);
      if(tmpDepth>depth){
          depth = tmpDepth;
      }
  })
  return depth+1;
}
