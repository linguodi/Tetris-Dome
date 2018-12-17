(function(){
    window.Block = function(){
        //在所有的形状中，选择一个砖块形状
        var arr = ["I","L","J","T","O","S","Z","A","B"];
        this.allType = arr[~~(Math.random() * arr.length)]
        //自己所有的方向个数
        this.allDirectionNumber = block_json[this.allType].length;
        //随意一个方向
        this.direction = ~~(Math.random() * this.allDirectionNumber);

        //得到形状，马上渲染图形的而进行code码
        this.code = block_json[this.allType][this.direction];

        //4 * 4小方块的初始位置
        this.row = 0;
        this.col = 4; //保证方块从中间出现
    }

    //渲染砖块
    Block.prototype.render = function(){
        for(var i = 0; i < 4;i++){
            for(var j = 0; j < 4;j++){
                //显示4 * 4矩阵颜色，写class类
                // game.setClass(this.row + i, this.col + j, "gray");
                if(this.code[i][j] == 1){
                    //如果4 * 4 二维数组编码中有1就渲染颜色，0就没色
                    game.setClass(this.row + i, this.col + j, this.allType)
                }
            }
        }
    }
    //检测碰撞，提供check方法，返回值true或false
    Block.prototype.check = function(row, col){
        for(var i = 0; i < 4;i++){
            for(var j = 0; j < 4;j++){
                if(this.code[i][j] != 0 && game.map.code[row + i][col + j] != 0){
                    return false; //如果不能进，返回false
                }
            }
        }
        return true; //能进返回true
    }

    //砖块下落
    Block.prototype.down = function(){
        game.map.code[0].forEach(function(item){
            if(item != 0){
                clearInterval(game.timer);
                alert `游戏结束！`;
            }
        })

        //使用check方法，如果为真就继续row++往下落
        if(this.check(this.row + 1, this.col)){
            this.row++;
        }else{
            //如果为假，表示碰到非0的砖块，将自己添加到map地图类
            this.addDie();
            //同时new一个新的砖块出来
            game.block = new Block();
            //每次触底都要检测是否可以消行
            this.remove();
        }
    }

    //左移动
    Block.prototype.left = function(){
        if(this.check(this.row, this.col - 1)){
            this.col--
            document.getElementById("move").play();
        }
    }
    //右移动
    Block.prototype.right = function(){
        if(this.check(this.row, this.col + 1)){
            this.col++
            document.getElementById("move").play();
        }
    }
    //一键到底
    Block.prototype.goDown = function(){
        while(this.check(this.row + 1, this.col)){
            this.row++;
            document.getElementById("goDown").play();
        }
    }
    //旋转
    Block.prototype.rotate = function(){
        //备份旧方向
        var oldDirection = this.direction;
        //如果旋转的值已经等于自己方向的个数，就回到0，重新翻转
        if(this.direction == this.allDirectionNumber -1){
            this.direction = 0;
        }else{
            //否则可以继续加旋转
            this.direction++;
            document.getElementById("rotate").play();
        }
        //得到方向下标后，马上渲染
        this.code = block_json[this.allType][this.direction];

        if(!this.check(this.row, this.col)){
            //已经碰到了
            //如果不可以旋转，就保持旧方向
            this.direction = oldDirection;
            this.code = block_json[this.allType][this.direction];
        }
    }

    //添加死亡方块
    Block.prototype.addDie = function(){
        for(var i = 0;i < 4;i++){
            for(var j = 0;j < 4;j++){
                if(this.code[i][j] != 0){
                    //如果不是0.表示有颜色（有砖块）
                    //将随机出来的字母类名，写在地图类中
                    game.map.code[this.row + i][this.col + j] = this.allType;
                }
            }
        }
    }

    //消行判断
    Block.prototype.remove = function(){
        //判断map地图类中的code中某一行是不是没有0.如果没有0，就消行
        for(var i = 0;i < 20;i++){
            if(!game.map.code[i].includes(0)){
                game.score++;
                document.getElementById("goDie").play()
                //如果没有0，就删除行
                game.map.code.splice(i ,1);
                //删除行之后，再重新在头部填充一行全是0的
                game.map.code.unshift(new Array(12).fill(0));
            }
        }
    }
})();