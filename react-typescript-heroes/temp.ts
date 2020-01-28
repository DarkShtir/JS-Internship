// --isolatedModules
// class Customer<O> {

//     private organizationsArr: O[] = [];
//     set organizations(orgs: O[]) {
//         this.organizationsArr = orgs;
//     }
//     get organizations(): O[] {
//         return this.organizationsArr;
//     }
//     public getFirstOrganization(id: string): O | undefined {
//         return this.organizationsArr[0];
//     }
// }

// class Org1 {
//     name = 'org1'
// }

// class Org2 {
//     name = 'org2';
//     sss = 2;
// }

// class Temp {
//     constructor() {
//         const customer = new Customer<Org1>();
//         customer.organizations = [new Org2()];

//     }
// }
