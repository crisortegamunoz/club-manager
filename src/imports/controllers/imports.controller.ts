import { Controller, Post, UseInterceptors, UseGuards, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ImportsService } from '../services/imports.service';
import { ImportResponse } from '../dtos/import-response.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from 'src/auth/guards/role-auth.guard';

@UseGuards(JwtAuthGuard, RoleAuthGuard)
@ApiTags('imports')
@Controller('imports')
export class ImportsController {
    constructor(private readonly importsService: ImportsService) { }

    @Post('players')
    @ApiOperation({ summary: 'Bulk import players', description: 'Import players data from an Excel file.' })
    @ApiConsumes('multipart/form-data')
    @ApiResponse({ status: 201, description: 'Players imported successfully', type: ImportResponse })
    @UseInterceptors(FileInterceptor('file'))
    async importPlayers(@UploadedFile() file: any) {
        return this.importsService.savePlayers(file.buffer);
    }
}