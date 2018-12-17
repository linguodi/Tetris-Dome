(function(){
    window.Game = function(){
        this.init();
        this.start();
        this.bindEvent();
        //实例化砖块类，当做Game类的子属性
        this.block = new Block();
        //实例化地图类，当做Game类的子属性
        this.map = new Map();
    }

    //20 * 12创建表格
    Game.prototype.init = function(){
        this.dom = document.createElement('table');
        document.getElementById("app").appendChild(this.dom);
        var tr,td;
        //循环插入行
        for(var i = 0;i < 20;i++){
            tr = document.createElement('tr');
            this.dom.appendChild(tr);
            for(var j = 0;j < 12;j++){
                //循环插入列
                td = document.createElement('td');
                tr.appendChild(td);

            }
        }
    }

    //如果别的类修改Game类的表格颜色，尽量提供一个方法给其他类调用，不要让其他类修改自己的属性
    //设置table表格的颜色
    Game.prototype.setClass = function(row, col, classname){
        this.dom.getElementsByTagName('tr')[row].getElementsByTagName('td')[col].className = classname
    }

    //清屏方法
    Game.prototype.clearClass = function(){
        for(var i = 0; i < 20;i++){
            for(var j = 0; j < 12;j++){
                game.setClass(i, j, "");
            }
        }
    }

    Game.prototype.bindEvent = function(){
        var self = this;
        document.onkeyup = function(e){
            if(e.keyCode == 37){
                self.block.left();
            }else if(e.keyCode == 38){
                self.block.rotate();
            }else if(e.keyCode == 39){
                self.block.right();
            }else if(e.keyCode == 40){
                self.block.goDown();
            }
        }
    }

    Game.prototype.start = function(){
        this.f = 0;
        this.score = 0;
        var self = this;
        this.timer = setInterval(function(){
            self.f++;
            document.getElementById("info").innerHTML = "帧编号：" + self.f;
            document.getElementById("score").innerHTML = "总分数：" + self.score;
            //清屏
            self.clearClass()
            //渲染砖块
            self.block.render();
            //渲染地图
            self.map.render();
            //每间隔20帧下落
            self.f % 20 == 0 && self.block.down();
        },30);
    }
})();