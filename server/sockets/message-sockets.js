module.exports = function(io) {
    io.on('connection', (socket) => {
      
        socket.on('new-task', (data) => {
            io.emit('emit-task', data);
        });
  
        socket.on('update-task', (data) => {
            console.log(data);
            io.emit('emit-task', data);
        });
  
        socket.on('delete-task', (data) => {
            io.emit('emit-task', data);
        });
  
    });
  }
  
  
  
  