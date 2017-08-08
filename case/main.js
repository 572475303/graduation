    var datatable = null;
    var db = openDatabase('Mydata','','My Database',102400);
    function  init() {
        datatable = document.getElementById("datatable");
        showAllData();

    }
    function removeAllData() {
        for(var i = datatable.childNodes.length-1;i>=0;i--){
            datatable.removeChild(datatable.childNodes[i]);
        }
    }
    function showData(row) {
        var li = document.createElement('li');
        var td1 = document.createElement('div');
        td1.innerHTML='<img src="img/num2.png">';
        var td2 = document.createElement('div');
        td2.innerHTML = row.name;
        var td3 = document.createElement('div');
        td3.innerHTML= row.message;
        var td4 = document.createElement('div');
        var t = new Date();
        var day =t.getDate();
        var month=t.getMonth()+1;
        var year=t.getFullYear();
        t.setTime(row.time);
        td4.innerHTML = t.getFullYear() + "/" + t.getMonth()+1 + "/" + day;
        li.appendChild(td1); 
        var td5 = document.createElement('div');
        li.appendChild(td5);
        td5.appendChild(td2);
        td5.appendChild(td3);
        td5.appendChild(td4);
        datatable.appendChild(li);
        td1.setAttribute("class", "td1");
        td2.setAttribute("class", "td2");                  
        td3.setAttribute("class", "td3");                  
        td4.setAttribute("class", "td4"); 
        td5.setAttribute("class", "td5"); 
        li.setAttribute("class", "li");              
    }
    function showAllData() {
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS MsgData(name TEXT,message TEXT,time INTEGER)',[]);
            tx.executeSql('SELECT * FROM MsgData',[],function (tx,rs) {
                removeAllData();
                for(var i =0 ;i<rs.rows.length ;i ++){
                    showData(rs.rows.item(i));
                }
            });
        });
    }
    
    function addData(name,message,time) {
        db.transaction(function (tx) {
            tx.executeSql('INSERT INTO MsgData VALUES(?,?,?)',[name,message,time],function (tx,rs) {
            alert("评论成功");          	
            },function (tx,rs) {
                alert(error.source+"::" + error.message);
            });
        });
    }
    function saveData() {
        var name = document.getElementById('name').value;
        var memo = document.getElementById('memo').value;
        var time = new Date().getTime();
        //alert(time);
        addData(name,memo,time);
        showAllData();
    }
