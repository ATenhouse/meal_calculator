var Patron = function(name, dishes, tipRate) {
  this.dishes = dishes || [];
  this.name = name || "Homer";
}
Patron.prototype.addDish = function addDish(dishName, dishCost) {
  this.dishes.push({
    cost: dishCost || 0,
    name: dishName || ''
  });
};
Patron.prototype.PatronSubtotal = function PatronSubtotal(){
  return this.dishes.reduce(function(a,b) { return a + b.cost }, 0);
}
Patron.prototype.setPersonalTip = function setPersonalTip(tipRate){
  this.personal = tipRate;
}
Patron.prototype.print = function() {
  console.log("The patron's subtotal is $", this.PatronSubtotal());
}
var Table = function Table() {
  this.patrons = [];
  this.taxRate = 0.07; // default; 7% is average for Illinois
  this.tipRate = 0.15; // 15% is typical
}
Table.prototype.addPatron = function addPatron(targetPatron) {
  if(Patron) {
    this.patrons.push(targetPatron);
  }
}
Table.prototype.setTaxRate = function setTaxRate(taxRate) {
  this.taxRate = taxRate || 0;
}
Table.prototype.setTipRate = function setTaxRate(tipRate) {
  this.tipRate = tipRate || 0;
}
Table.prototype.getTotalMealCost = function getTotalMealCost() {
  var subtotal = this.patrons.reduce(function(total, targetPatron) {
    return total += targetPatron.PatronSubtotal();
  }, 0);
  return subtotal;
}
Table.prototype.generateSubtotals = function generateSubtotals() {
  var fairList = this.patrons.map(function(targetPatron) {
    var fairAmount = targetPatron.PatronSubtotal();
    return [targetPatron.name, fairAmount.toFixed(2)];
  });
  return fairList;
}
Table.prototype.tablePrint = function tablePrint() {
  var subtotal = this.getTotalMealCost();
  var taxRate = this.taxRate;
  var splitAmount = subtotal / this.patrons.length;
  var patronList = this.generateSubtotals();
  console.log("Thank you for dining with us!");
  console.log(new Array(30).join("-"));
  console.log("Group Subtotal: $%s", subtotal);
  var taxOwed = subtotal * taxRate / this.patrons.length;
  console.log("Tax (%s) : $%s", this.taxRate, (subtotal * taxRate).toFixed(2));
  console.log("Total with Tax: $%s", subtotal*(1 + taxRate).toFixed(2));
  console.log(new Array(30).join("-"));
  console.log("Subtotals:")
  patronList.forEach(function(line) {
    var name = line[0], owedAmount = line[1];
    var baseOwed = Number(owedAmount).toFixed(2);
    var baseAfterTax = (owedAmount*(1+taxRate)).toFixed(2);
    console.log("%s owes $%s / with tax: $%s", name, baseOwed, baseAfterTax);
  });
  console.log("After evenly splitting the group tip:")
    patronList.forEach(function(line) {
    var name = line[0], newAmount = line[1]*(1+taxRate)+taxOwed;
    console.log("%s owes $%s", name, newAmount.toFixed(2));
  });
}
var lance = new Patron("Lance");
var pidge = new Patron("Pidge");
var chunk = new Patron("Chunk");
var keith = new Patron("Keith");
var shiro = new Patron("Shiro");
lance.addDish("Steak", 15);
pidge.addDish("Peanut Butter Sandwich", 4);
chunk.addDish("Another table's worth of food", 70);
keith.addDish("Saffron sorrel",12);
shiro.addDish("Ramen", 1);
var teamVoltron = new Table();
teamVoltron.setTaxRate(0.15); // Altea-in-exile is pretty steep ...
teamVoltron.setTipRate(0.10); // Heroes eat (nearly) free!
teamVoltron.addPatron(lance);
teamVoltron.addPatron(pidge);
teamVoltron.addPatron(shiro);
teamVoltron.addPatron(keith);
teamVoltron.addPatron(chunk);
teamVoltron.tablePrint();
