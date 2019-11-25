var path = require('path')
var fs = require('fs')

function recFindByExt(base, ext, files, result) {
    files = files || fs.readdirSync(base)
    result = result || []

    files.forEach(
        function (file) {
            var newbase = path.join(base, file)
            if (fs.statSync(newbase).isDirectory()) { //directory
                result = recFindByExt(newbase, ext, fs.readdirSync(newbase), result)
            } else { //file
                if (file.substr(-1 * (ext.length + 1)) == '.' + ext) {
                    console.log(file);

                    result.push(newbase)
                }
            }
        }
    )
    return result
}

// ext_file_list = recFindByExt('/mypath', 'ext')

module.exports.file = (path, ext) => recFindByExt(path, ext)