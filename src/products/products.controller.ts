import {
    Body,
    Controller,
    Get, HttpException, HttpStatus, Param, ParseIntPipe,
    Post, Put,
    Query, Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    ValidationPipe
} from '@nestjs/common';
import {ProductsService} from "./products.service";
import {CreateProductDto} from "./dto/createProduct.dto";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Product} from './products.model';
import {GetByPropertiesDto} from "./dto/getByProperties.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {Roles} from "../guards/decorators/rolesAuth.decorator";
import {RolesGuard} from "../guards/roles.guard";
import {JwtAuthGuard} from "../guards/jwtAuth.guard";
import {imageFilter} from "./imageFilter";
import {UpdateProductDto} from "./dto/updateProduct.dto";

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @ApiOperation({summary: 'Get all products'})
    @ApiResponse({status: 200, type: [Product]})
    @Get()
    async getAll() {
        return await this.productsService.getAll();
    }

    @ApiOperation({summary: 'Get some amount of products by their properties'})
    @ApiResponse({status: 200, type: [Product]})
    @Get('find')
    async getByProperties(@Query(new ValidationPipe({whitelist: true, transform: true}))
                                  dto: GetByPropertiesDto) {
        return await this.productsService.getByProperties(dto);
    }

    @ApiOperation({summary: 'Create a product'})
    @ApiBearerAuth()
    @ApiResponse({status: 201, type: Product})
    @ApiResponse({ status: 403, description: 'User doesn\'t meet the role requirements'})
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image', {fileFilter: imageFilter}))
    async createProduct(@Body() dto: CreateProductDto,
                        @UploadedFile() image,
                        @Req() req) {
        if (!image || req.fileValidationError) {
            throw new HttpException('File must be an image', HttpStatus.BAD_REQUEST);
        }
        return await this.productsService.createProduct(dto, image);
    }

    @ApiOperation({summary: 'Update a product'})
    @ApiBearerAuth()
    @ApiResponse({status: 204, type: Product})
    @ApiResponse({ status: 404, description: 'Product is not found'})
    @ApiResponse({ status: 403, description: 'User doesn\'t meet the role requirements'})
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor('image', {fileFilter: imageFilter}))
    @Put('/:id')
    async updateProduct(@Body(new ValidationPipe({whitelist: true, transform: true})) dto: UpdateProductDto,
                        @Param('id', ParseIntPipe) id: number,
                        @UploadedFile() image) {
        return await this.productsService.updateProduct(dto, id, image);
    }
}

