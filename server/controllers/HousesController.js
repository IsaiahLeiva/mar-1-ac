import { housesService } from "../services/HousesService"



export class HousesController extends BaseController {
    constructor() {
        super('api/houses')
        this.router
            .get('', this.getAll)
            .get('/:houses', this.getById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .put('/:houses', this.edit)
            .delete('/:houses', this.remove)
    }

    async getAll(req, res, next) {
        try {
            const houses = await housesService.getAll(req.query)
            return res.send(houses)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const house = await housesService.getById(req.params.id)
            return res.send(house)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const house = await housesService.create(req.body)
            return res.send(house)
        } catch (error) {
            next(error)
        }
    }

    async edit(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            //NOTE: why params below?
            req.body.id = req.params.id
            const update = await housesService.edit(req.body)
            return res.send(update)
        } catch (error) {
            next(error)
        }
    }

    async remove(req, res, next) {
        try {
            const userID = req.userID.id
            const houseID = req.params.id
            await housesService.remove(houseID, userID)
            return res.send('House Gone Now')
        } catch (error) {
            next(error)
        }
    }
}