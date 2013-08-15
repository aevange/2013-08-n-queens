// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)

window.findNRooksSolution = function(n){
  var solution = createMatrix(n);
  console.log('Single solution for ' + n + ' rooks:', solution);
  return solution;
};

window.countNRooksSolutions = function(n){
  //create hashTable of solutions
  //createMatrix(n);
  //nested for loop: swap "row" i with "row" j
  //enter swapped matrix into hashtable
  //for in loop to get count.
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
      newHashOfRows[i] = currentRow;
      var newRowsCount = 0;
      for(var key in newHashOfRows) {
        newRowsCount++;
      }
      //checks if passing "Rook tests"
      if (++currentRow === newRowsCount) {
        if(currentRow === n) {
          solutions[decodeHashToMatrix(newHashOfRows,n)] = true;
        } else {
          insertRow(newHashOfRows);  
        }
      }
    }
  };

  insertRow();

  var solutionCount = 0;
  for (var i in solutions){
    solutionCount++;
  }
  (n === 0) && (solutionCount = 1);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.findNQueensSolution = function(n){
  var solutions = queensSolutions(n);
  var solution = {};
  !!solutions[0] && (solution = decodeHashToMatrix(solutions[0]));
  
  console.log('Single solution for ' + n + ' queens:', solution);
  return solution;
};

window.countNQueensSolutions = function(n){
  var solutions = queensSolutions(n);
  var solutionCount = countNQSols(solutions, n);
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
      newHashOfRows[i] = currentRow;
      var newRowsCount = 0;
      for(var key in newHashOfRows) {
        newRowsCount++;
      }
      //checks if passing "Rook tests"
      if (++currentRow === newRowsCount) {
        if(currentRow === n) {
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
  if (n === 1) {
    solutions[0] = {0: 1};
  }
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