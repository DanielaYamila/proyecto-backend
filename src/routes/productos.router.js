import { Router, request, response } from 'express';
import Contenedor from '../contenedor.js';
import uploader from '../service/upload.js'

const contenedor = new Contenedor();
const router = Router();

router.get('/', async (request, response) => {
    let result = await contenedor.readProducts()
    response.send(result)
})

router.post('/', uploader.single('image'), async (request, response) => {
    let image = '';
    if (request.file) {
        image = request.protocol +"://"+ request.hostname +":8080/images/"+ request.file.filename
    }
    let product = request.body;
    if ((product.title && product.description && product.price) != '') {
        product.image = image;
        const result = await contenedor.createProduct(product)
        response.send({product: result})
    } else {
        response.send({ status: "Error", message: "Campos vacios." })
    }
})

router.get('/:id', async (request, response) => {
    const id = request.params.id
    let result = await contenedor.getById(id)
    response.send(result)
})

router.put('/:id', async (request, response) => {
    const id = request.params.id
    const productBody = request.body
    let result = await contenedor.updateItem(productBody, id)
    response.send(result)
})

router.delete('/:id', async (request, response) => {
    const id = request.params.id
    let result = await contenedor.deleteById(id)
    response.send(result)
})

export default router;