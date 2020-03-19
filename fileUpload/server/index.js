const http = require('http')
const path = require('path')
const fse = require('fs-extra')
const multiparty = require('multiparty')

const server = http.createServer()
const UPLOAD_DIR = path.resolve(__dirname, "..", 'target')

const resolvePost = req =>
    new Promise(resolve => {
        let chunk = '';
        req.on('data', data => {
            chunk += data
        })
        req.on('end', () => {
            resolve(JSON.parse(chunk))
        });
    });

const mergeFileChunk = async (filePath, fileHash) => {
    const chunkDir = `${UPLOAD_DIR}/${fileHash}`;
    const chunkPaths = await fse.readdir(chunkDir);
    await fse.writeFile(filePath + '1', "");
    chunkPaths.forEach(chunkPath => {
        fse.appendFileSync(filePath, fse.readFileSync(`${chunkDir}/${chunkPath}`));
        fse.unlinkSync(`${chunkDir}/${chunkPath}`);
    });
    fse.rmdirSync(chunkDir); // 合并后删除保存切片的目录
}
const extractExt = filename => {
    filename.slice(filename.lastIndexOf('.'), filename.length);
}

server.on('request', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "*")
    if (req.method === 'OPTIONS') {
        res.status = 200
        res.end()
        return
    }
    if(req.url === '/verify'){
        const data = await resolvePost(req);
        const {fileHash, filename} = data;
        const ext = extractExt(filename);
        const filePath = `${UPLOAD_DIR}/${fileHash}${ext}`
        if(fse.existsSync(filePath)) {
            res.end(
                JSON.stringify({
                    shouldUpload: false
                })
            )
        } else {
            res.end(
                JSON.stringify({
                    shouldUpload: true
                })
            )
        }
    }
    if (req.url === '/merge') {
        const data = await resolvePost(req)
        const { filename } = data
        const filePath = `${UPLOAD_DIR}/${filename}`
        await mergeFileChunk(filePath, filename);
        res.end(
            JSON.stringify({
                code: 0,
                message: 'file merged success'
            })
        )
    }

    const multipart = new multiparty.Form()

    multipart.parse(req, async (err, fields, files) => {
        if (err) {
            return
        }
        const [chunk] = files.chunk;
        const [hash] = fields.hash;
        const [filename] = fields.filename;
        const chunkDir = `${UPLOAD_DIR}/${filename}`

        if (!fse.existsSync(chunkDir)) {
            await fse.mkdirs(chunkDir)
        }

        await fse.rename(chunk.path, `${chunkDir}/${hash}`)
        res.end('received file chunk')
    })
})



server.listen(3000, () => console.log('now listening on port 3000'))