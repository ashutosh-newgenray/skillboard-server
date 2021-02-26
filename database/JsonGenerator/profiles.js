[
  "{{repeat(1, 100)}}",
  {
    _id: "{{objectId()}}",
    id: "{{index(1)}}",
    emp_id: "{{guid()}}",
    isActive: "{{bool()}}",
    picture: "http://placehold.it/128x128",
    dob: '{{date(new Date(1970, 0, 1), new Date(1998, 0, 1), "YYYY-MM-dd")}}',
    name: "{{firstName()}} {{surname()}}",
    gender: "{{gender()}}",
    email: "{{email()}}",
    city: "{{city()}}",
    country: "{{state()}}",
    designation:
      '{{random("Associate L1","Associate L2","Senior Associate L1","Senior Associate L2","Manager","Senior Manager")}}',
    joining_date: '{{date(new Date(2010, 0, 1), new Date(), "YYYY-MM-dd")}}',
    tags: [
      "{{repeat(6)}}",
      '{{random("html", "css", "javascript", "react","angular","node","vuejs","python","php","laravel","java", "c++","cobol","Rust","react-native","dart","flutter","swift","ruby")}}',
    ],
    skills: [
      "{{repeat(6)}}",
      {
        skill_id: '{{random("1","2","3","4","5","6","7","8","9","10")}}',
        skill:
          '{{random("html", "css", "javascript", "react","angular","node","vuejs","python","php","laravel","java", "c++","cobol","Rust","react-native","dart","flutter","swift","ruby")}}',
        score: "{{integer(1200, 8000)}}",
      },
    ],
    favorite: "{{integer(100, 500)}}",
    likes: "{{integer(100, 500)}}",
  },
];
