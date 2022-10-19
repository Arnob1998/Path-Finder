function matixMapper(grid ,grid_x,grid_y,pixe_size,pixle_num){ // grid_d and pixe_size is rooted value
    cols = grid_x / pixe_size // NOTE THIS ASSUMES [SQRT]
    rows = cols // if squar row == col

    gridMapMat = []

    start_i = 0;
    end_i = start_i + rows; // add 20

    var gridMap = getCurrentGridMap(pixle_num);

    for(let r = 0; r < rows; r++)
    {
        row_slice = Object.fromEntries(Object.entries(gridMap).slice(start_i, end_i));
        gridMapMat.push(row_slice);
        start_i = end_i;
        end_i = rows + start_i;
    }          
    return gridMapMat;      
}



class MatToFrontierPipe{
    matrixMap = null;
    constructor(matrixMap){
        this.matrixMap = matrixMap;
        console.log("MatToFrontierPipe INNITED!")
        console.log(this.matrixMap);
    }

    pixelSlicePos(pixel_index){
        var curr_pixel_rindex = null;

        for(let i = 0; i < this.matrixMap.length; i++){
            if(this.matrixMap[i][pixel_index] != undefined){
                curr_pixel_rindex = i;
                break;
            }
        }

        if(curr_pixel_rindex == null){
            return null;
        }
        else{
            return curr_pixel_rindex;
        } 
    }
    
    adjacent_pixelFinder(pixel_index){
        if(this.pixelSlicePos(pixel_index)!= null){
        // [TEMP]
            var result = {};
            var map = {"top":-20, "bottom":+20, "left":-1, "right":+1}             
            
            for (const [key, value] of Object.entries(map)) {
                var positon = this.pixelSlicePos(pixel_index + value)
                
                if(positon!=null)
                {
                    result[key] = positon + "-" + (pixel_index + value).toString();
                }
                else{
                    result[key] = null;
                }
            }        

            return result;
        }
        else{
            return null;
        }
    }
}