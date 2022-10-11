import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Product} from "./products.model";
import {CreateProductDto} from "./dto/createProduct.dto";
import {FilesService} from "../files/files.service";
import {UpdateProductDto} from "./dto/updateProduct.dto";
import {GetByPropertiesDto} from "./dto/getByProperties.dto";

@Injectable()
export class ProductsService {
    constructor (@InjectModel(Product) private productRepository: typeof Product,
                 private filesService: FilesService) {}

    async getAll() {
        return await this.productRepository.findAll();
    }

    async getByProperties(properties: GetByPropertiesDto) {
        const limit = properties.limit;
        const offset = properties.offset;
        delete properties.offset;
        delete properties.limit;

        return await this.productRepository.findAll({
            where: {
                ...properties
            },
            limit,
            offset
        });
    }

    async createProduct(dto: CreateProductDto, image) {
        const fileName = await this.filesService.createFile(image);
        return await this.productRepository.create({...dto, image: fileName});
    }

    async updateProduct(dto: UpdateProductDto, id: number, image) {
        const product = await this.productRepository.findByPk(id);
        if (!product) {
            throw new HttpException('Product is not found', HttpStatus.NOT_FOUND);
        }

        if (image) {
            product.image = await this.filesService.createFile(image);
        }

        product.set(dto);
        return await product.save();
    }
}
