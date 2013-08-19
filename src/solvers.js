// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)

window.findNRooksSolution = function(n){
  var solution = createMatrix(n);
  console.log('Single solution for ' + n + ' rooks:', solution);
  return solution;
};

window.countNRooksSolutions = function(n){
  
//BITWISE SOLUTION!!
  var hashOfSolutions = {};
  var arrayOfUniqueSolutions = [];
  var recursivlyBuildBoard = function(n, board, col, MJD, mid){
    var newBoard;
    if(board === undefined){
      board = [];
      col = 0;
    }

    for (var i = n -1 ; i >= 0; i--){
      newBoard = board.slice(0)
      var candidate = Math.pow(2,i);
      var conflictResolution = col & candidate;
      if(conflictResolution === 0){
        newBoard.push(i);
        var c = col | candidate;
        if (newBoard.length === n) {
          if (hashOfSolutions[newBoard] !== true){
            arrayOfUniqueSolutions.push(newBoard);
            hashOfSolutions[newBoard] = true;
          }
        } else {
          recursivlyBuildBoard(n, newBoard, c, MJD, mid);
        }
      }
    }
  };
  recursivlyBuildBoard(n);
  var solutionCount = arrayOfUniqueSolutions.length;
  (n === 0) && (solutionCount = 1);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.findNQueensSolution = function(n){
  var solution;
//BITWISE SOLUTION!!
  var recursivlyBuildBoard = function(n, board, col, MJD, mid){
    var newBoard;
    if(board === undefined){
      board = [];
      col = 0;
      MJD = 0;
      mid = 0;
    }

    for (var i = n -1 ; i >= 0; i--){
      newBoard = board.slice(0)
      var candidate = Math.pow(2,i);
      var conflictResolution = (col & candidate) | (MJD & candidate) | (mid & candidate);
      if(conflictResolution === 0){
        newBoard.push(i);
        var c = col | candidate;
        var MJ = (MJD | candidate)<<1;
        var mi = (mid | candidate)>>1;
        if (newBoard.length === n) {
          solution = newBoard;
          break;
        } else {
          recursivlyBuildBoard(n, newBoard, c, MJ, mi);
        }
      }
    }
  };
  recursivlyBuildBoard(n);
  var matrix = [[]];

  !!solution && (matrix = decodeArrayToMatrix(solution));
  
  console.log('Single solution for ' + n + ' queens:', matrix);
  return matrix;
};

window.countNQueensSolutions = function(n){
//BITWISE SOLUTION!!
  var hashOfSolutions = {};
  var arrayOfUniqueSolutions = [];
  var recursivlyBuildBoard = function(n, board, col, MJD, mid){
    var newBoard;
    if(board === undefined){
      board = [];
      col = 0;
      MJD = 0;
      mid = 0;
    }

    for (var i = n -1 ; i >= 0; i--){
      newBoard = board.slice(0)
      var candidate = Math.pow(2,i);
      var conflictResolution = (col & candidate) | (MJD & candidate) | (mid & candidate);
      if(conflictResolution === 0){
        newBoard.push(i);
        var c = col | candidate;
        var MJ = (MJD | candidate)<<1;
        var mi = (mid | candidate)>>1;
        if (newBoard.length === n) {
          if (hashOfSolutions[newBoard] !== true){
            arrayOfUniqueSolutions.push(newBoard);
            hashOfSolutions[newBoard] = true;
          }
        } else {
          recursivlyBuildBoard(n, newBoard, c, MJ, mi);
        }

      }
    }
  };
  recursivlyBuildBoard(n);
  var solutionCount = arrayOfUniqueSolutions.length;
  (n === 0) && (solutionCount = 1);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};

//our functions
var makeRow = function(n){
  return _(_.range(n)).map(function(){
    return 0;
  });
};

//As no two Rooks or Queen can occupy a singe row or column
//permutations of n rows each with a piece placed in
//different colums will be sufficinet to solve for 
//row and column conflicts.
//The returned matrix keys correspond to a unique array that
//indicates the position of the piece.
var createMatrix = function(n){
  var matrix = {};
  for(var i = 0; i < n; i++){
    var emptyRow = makeRow(n);
    matrix[i] = {};
    emptyRow[i] = 1;
    matrix[i] = emptyRow;
  }
  return matrix;
};

//An array of n lenght that corresponds to the positions of the rows
//in the matrix created above.
var matrixArray = function(n){
  var result =[];
  for (var i = 0; i < n; i++){
    result.push(i);
  }
  return result;
};

var decodeHashToMatrix = function(hash, n) {
  var matrix = [];

  for(var i = 0; i < n; i++) {
    var rowToInsert = makeRow(n);

    rowToInsert[i] = 1;

    matrix[hash[i]] = rowToInsert;
  }
  return matrix;
};

var allQueenSolutions = function(n){
  //start here?
};

var decodeArrayToMatrix = function(array){
  var j;
  var matrix = [];
  var n = array.length;
  for (var i = 0; i < n; i ++){
    var rowToInsert = makeRow(n);
    j = array[i];
    rowToInsert = makeRow(n);
    rowToInsert[j] = 1;
    matrix.push(rowToInsert);
  }
  return matrix;
};

var DiagonalConflicts = function(hash, n){
  var result = false;
  for (var i = 0; i < n; i++){
    for (var j = 0; j < n; j++){
      if(i !== j){
      result = result || (i - j === hash[i] - hash[j]) || (i - j === hash[j] - hash[i]);
      }
    }
  }
  return result;
};

var queensSolutions = function(n){

  var solutions = {};
  var insertRow = function(hashOfRows){
    if(hashOfRows === undefined){
      hashOfRows = {};
    }
    for (var i =0; i < n; i++) {
      var currentRow = 0;
      var newHashOfRows = {};
      for (var key in hashOfRows) {
        newHashOfRows[key] = hashOfRows[key];
        currentRow++;
      }
      if(newHashOfRows[i] === undefined){
        newHashOfRows[i] = currentRow;
        if(++currentRow === n) {
          if(!DiagonalConflicts(newHashOfRows,n)){
            solutions[decodeHashToMatrix(newHashOfRows,n)] = true;
          }
        } else {
          insertRow(newHashOfRows);  
        }
      }
    }
  };

  insertRow();
  return solutions;
};

var countNQSols = function (sols, n) {
  var solutionCount = 0;
  for (var i in sols){
    solutionCount++;
  }
  (n === 0 || n === 1) && (solutionCount = 1);
  return solutionCount;
}