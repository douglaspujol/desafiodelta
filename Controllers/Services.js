class Services {
  constructor() {
    this.state = [];
    this.container = document.getElementById('resultComparator');
    this.listOfServices = document.querySelector('.list')
    this.comparator = document.querySelector('.listDrag')
    this.dragAndDrop();
  }

  dragAndDrop() {

    //group 01
    Sortable.create(this.listOfServices, {
      animation: 100,

      chosenClass: 'selecionado',
      group: {
        name: 'bar',
        put: 'qux',
      },
    });

    //group 02
    Sortable.create(this.comparator, {
      chosenClass: 'selecionado',

      group: {
        name: 'qux',
        put: function (to) {
          return to.el.children.length < 2;
        },
      },
      onAdd: () => {
        this.comparatorStart()
      },
      onRemove: () => {
        this.remuveResult();
      }


    });
  }


  comparatorStart() {
    const list = document.querySelectorAll('.listDrag [class=itemList]');
    if (list.length > 1) {
      list.forEach(e => {
        let price = e.querySelector('span').innerHTML;
        let pricerReplace01 = price.replace("R$ ", "")
        let pricerReplace02 = Number(pricerReplace01.replace(",", "."))
        this.state.push(pricerReplace02)
      })
      this.priceTotal(this.state[0], this.state[1]);
    }



  }

  priceTotal(a, b) {
    if (a >= b) {
      let calcB = (b * 6);
      let arredondamento = (calcB.toFixed(2))

      this.addResult(arredondamento)
      this.state = [];


    } else {
      let calcA = a * 6;
      let arredondamento = (calcA.toFixed(2))

      this.addResult(arredondamento)

      this.state = [];
    }
  }

  addResult(numb) {
    this.container.classList.add('resultComparator');
    this.container.innerHTML = `
      <span> A semestralidade mais barata é R$ ${numb}.</span>
    
    `;
  }

  remuveResult() {
    try {

      this.container.classList.remove('resultComparator');
      this.container.innerHTML = ``;


    } catch (error) {

    }

  }



}

const drag = new Services()
