import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors"



class HousesService {
    async getAll(query = {}) {
        const houses = await dbContext.Houses.find(query)
        return houses
    }

    async getById(id) {
        const house = await dbContext.Houses.findById(id)
        if (!house) {
            throw new BadRequest('invalid house id')
        }
        return house
    }

    async create(body) {
        const house = await dbContext.Houses.create(body)
        return house
    }

    async edit(update) {
        const original = await this.getById(update.id)
        if (original.creatorId.toString() !== update.creatorId) {
            throw new Forbidden('You dont own this house fren')
        }

        original.bedrooms = update.bedrooms ? update.bedrooms : original.bedrooms
        original.bathrooms = update.bathrooms ? update.bathrooms : original.bathrooms
        original.style = update.style ? update.style : original.style
        original.price = update.price ? update.price : original.price
        original.imgUrl = update.imgUrl ? update.imgUrl : original.imgUrl
        original.description = update.description ? update.description : original.description

        await original.save({ runValidators: true })
        return original
    }

    async remove(houseID, userID) {
        const house = await this.getById(houseID)
        if (house.houseID.toString() !== houseID) {
            throw new Forbidden('Not Allowed')
        }
        await dbContext.Houses.findByIdAndDelete(houseID)
    }

}

export const housesService = new HousesService()