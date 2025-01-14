(() => {
  /* 类装饰器 */
  function AddProperty(value: string): ClassDecorator {
    return (target: any) => {
      target.prototype.newInstanceProperty = value
      target.newStaticProperty = `static ${value}`
    }
  }
  function AddMethod(): ClassDecorator {
    return (target: any) => {
      target.prototype.newInstanceMethod = () => {
        console.log('add a new instance method!')
      }
      target.newStaticMethod = () => {
        console.log('add a new static method!')
      }
    }
  }

  @AddProperty('lh')
  @AddMethod()
  class Foo {
    a = 1
  }

  const foo: any = new Foo();
  foo.newInstanceMethod();
  (<any>Foo).newStaticMethod();
  console.log(foo.newInstanceProperty);
  console.log((<any>Foo).newStaticProperty);

  function OverrideBar(target: any) {
    return class extends target {
      print() {}
      overridedPrint() {
        console.log('This is Overrided Bar!');
      }
    }
  }

  @OverrideBar
  class Bar {
    print() {
      console.log('This is Bar!');
    }
  }

  new Bar().print();
  (<any>new Bar()).overridedPrint();

  /**
   * 方法装饰器
   * 方法装饰器的 target 是类的原型而非类本身
   */
  function ComputeProfiler(): MethodDecorator {
    return (_target, methodIdentifier, descriptor: TypedPropertyDescriptor<any>) => {
      const originalMethodImpl = descriptor.value!;
      descriptor.value = async function(...args: unknown[]) {
        const start = new Date();
        const result = await originalMethodImpl.apply(this, args);
        const end = new Date();
        console.log(
          `${String(methodIdentifier)} Time: `,
          end.getTime() - start.getTime()
        );
        return result;
      }
    }
  }

  class Baz {
    @ComputeProfiler()
    async fetch() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('RES');
        }, 3000);
      });
    }
  };

  (async () => {
    console.log(await new Baz().fetch());
  })();

  /**
   * 访问符装饰器
   * getter / setter
   */
  function HiSetter(val: string): MethodDecorator {
    return (target, methodIdentifier, descriptor: any) => {
      const originalSetter = descriptor.set;
      descriptor.set = function (nVal: string) {
        const composed = `Raw: ${nVal}, Actual: ${val}-${nVal}`;
        originalSetter.call(this, composed);
        console.log(`HiSetter: ${composed}`);
      }
    }
  }

  class Bao {
    _value!: string;

    get value() {
      return this._value;
    }

    @HiSetter('hi')
    set value(input: string) {
      this._value = input;
    }
  }

  const bao = new Bao();
  bao.value = 'LH';

  /**
   * 属性装饰器
   * 属性装饰器在独立使用时能力非常有限，
   * 它的入参只有类的原型与属性名称，返回值会被忽略，但你仍然可以通过直接在类的原型上赋值来修改属性
   */
  function ModifyNickName(): PropertyDecorator {
    return (target: any, propertyIdentifier) => {
      target[propertyIdentifier] = 'LH'
      target.otherName = 'other'
    }
  }

  class Zoo {
    @ModifyNickName()
    nickName!: string;
    constructor() {};
  }
  console.log(new Zoo().nickName);
  // @ts-expect-error
  console.log(new Zoo().otherName);

  /**
   * 参数装饰器
   * 参数装饰器包括了构造函数的参数装饰器与方法的参数装饰器，
   * 它的入参包括类的原型、参数所在的方法名与参数在函数参数中的索引值（即第几个参数），如果只是单独使用，它的作用同样非常有限。
   */
  function CheckParam(): ParameterDecorator {
    return (target, methodIdentifier, index) => {
      console.log(target, methodIdentifier, index);
    };
  }

  class Che {
    handler(@CheckParam() input: string) {
      console.log(input);
    }
  }

  new Che().handler('lh');

  console.log('git rebase111');
  console.log('git rebase222');
})()
