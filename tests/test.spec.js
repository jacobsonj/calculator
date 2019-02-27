
describe('Test', function() {
  var document = {
    getElementById: function(){
      return {
        addEventListener: function(){}
      };
    }
  };

  

  describe('add', function() {
    it('should add two numbers', function() {
      expect(add(2, 3)).toBe(5);
    });
  });
});