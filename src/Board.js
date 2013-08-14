(function(){

  window.Board = Backbone.Model.extend({

    initialize: function(params){
      if (params.n) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function(){
      return _(_.range(this.get('n'))).map(function(rowIndex){
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex){
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex){
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex){
      return colIndex + rowIndex;
    },


    hasAnyRooksConflicts: function(){
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex){
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function(){
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex){
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    // todo: fill in all these functions - they'll help you!

    hasRowConflictAt: function(rowIndex){
      var result = false;
      var row = this._currentAttributes[rowIndex];
      var ones = 0;
      for (var i = 0; i < row.length; i++){
        row[i] && ones++;
      }
      ones > 1 && (result = true);
      return result;
    },

    hasAnyRowConflicts: function(){
      var result = false;
      var n = this._currentAttributes.n;
      for(var i = 0; i < n; i++){
        result = result || this.hasRowConflictAt(i);
      }
      return result;
    },

    hasColConflictAt: function(colIndex){
      var result = false;
      var board = this._currentAttributes;
      var ones = 0;

      for(var j = 0; j < board.n; j++) {
        board[j][colIndex] && ones++;
      }
      ones > 1 && (result = true);
      return result;
    },

    hasAnyColConflicts: function(){
      var result = false;
      var n = this._currentAttributes.n;

      for (var j = 0; j < n; j++) {
        result = result || this.hasColConflictAt(j);
      }
      return result;
    },

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow){
      var argI = majorDiagonalColumnIndexAtFirstRow;
      var result = false;
      var thisBoard = this._currentAttributes;
      var ones = 0;
      for(var row = 0; row < thisBoard.n; row++){
        !!thisBoard[row][argI + row] && ones++;
      }
      ones > 1 && (result = true);
      return result;
    },

    hasAnyMajorDiagonalConflicts: function(){
      var result = false;
      var n = this._currentAttributes.n;
      for(var i = 1-n; i < n; i++){
        result = result || this.hasMajorDiagonalConflictAt(i);
      }
      return result;
    },

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow){
      var argJ = minorDiagonalColumnIndexAtFirstRow;
      var result = false;
      var thisBoard = this._currentAttributes;
      var ones = 0;
      for(var row = 0; row < thisBoard.n; row++){
        var thisCol = argJ - row;
        !!thisBoard[row][thisCol] && ones++; 
      }
      ones > 1 && (result = true);
      return result; 
    },

    hasAnyMinorDiagonalConflicts: function(){
      return this.hasMinorDiagonalConflictAt(-1); // fixme
    }

  });

  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

}());
