
// describe('requests made', function() {

//   afterEach(function() {
//     mock.teardown();
//   });

//   beforeEach(function() {
//     mock([{
//       request: {
//         path: '/api/medications',
//         method: 'GET'
//       },
//       response: {
//         data: [{
//           id: 12,
//           name: "Abilify (Aripiprazole)",
//           dosage: "5mg",
//           instruction: "Take one tablet by mouth every morning",
//           reminder: "10:30AM Every Day",
//           image: "http://pillbox.nlm.nih.gov/assets/small/540920173.jpg"
//         }, {
//           id: 123,
//           name: "Actiq (Fentanyl Citrate)",
//           dosage: "5mg",
//           instruction: "Take one tablet by mouth every morning",
//           reminder: "10:30AM Every Day",
//           image: "http://pillbox.nlm.nih.gov/assets/small/540920173.jpg"
//         }, {
//           id: 1234,
//           name: "Halcion (Triazolam)",
//           dosage: "5mg",
//           instruction: "Take one tablet by mouth every morning",
//           reminder: "10:30AM Every Day",
//           image: "http://pillbox.nlm.nih.gov/assets/small/540920173.jpg"
//         }, {
//           id: 12345,
//           name: "Quinidex (Quinidine)",
//           dosage: "5mg",
//           instruction: "Take one tablet by mouth every morning",
//           reminder: "10:30AM Every Day",
//           image: "http://pillbox.nlm.nih.gov/assets/small/540920173.jpg"
//         }]
//       }
//     }]);

//     get();
//   });

//   it('can evaluate requests made', function() {

//     expect(mock.requestsMade()).toEqual([{
//       url: '/api/medications',
//       method: 'GET'
//     }, ]);
//   });

//   it('can clear requests', function() {
//     mock.clearRequests();
//     expect(mock.requestsMade()).toEqual([]);
//   });
// });

