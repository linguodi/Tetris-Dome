(function(){
    window.Map = function(){
        this.code = (function(){
            var arr = [];
            for(var i = 0;i < 20;i++){
                arr.push([]);
                for(var j = 0;j < 12;j++){
                    arr[i].push(0)
                }
            }
            arr.push(Array(12).fill(1));
            return arr;
        })();

        console.log(this.code)
    }

    //地图渲染
    Map.prototype.render = function(){
        for(var i = 0;i < 20; i++){
            for(var j = 0;j < 12; j++){
                //如果地图中二维数组中有非0的，就渲染方块
                if(this.code[i][j] != 0){
                    game.setClass(i, j, this.code[i][j])
                }
            }
        }
    }
})()