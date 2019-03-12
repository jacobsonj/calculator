describe('handleNumber', function(){
  var addToResultSpy
  beforeEach(function(){
    addToResultSpy = spyOn(window, 'addToResult').and.returnValue(true);
  })
  it('should add selected number to screen', function(){
    handleNumber('5');
    expect(addToResultSpy.calls.mostRecent().args[0]).toBe('5');
  })
})