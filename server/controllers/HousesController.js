


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
            const houses = await
        } catch (error) {

        }
    }


}