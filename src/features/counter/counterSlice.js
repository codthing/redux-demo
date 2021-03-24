import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: state => {
      // Redux Toolkit允许我们在化简器中编写“变异”逻辑。 
      // 它实际上并没有改变状态，因为它使用了“ Immer”库，该库可以检测到“草稿状态”的更改并根据这些更改生成一个全新的不可变状态
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// 下面的函数称为“ thunk”，它使我们能够执行异步逻辑。 
// 它可以像常规动作一样被调度：`dispatch（incrementAsync（10））`。 
// 这将使用`dispatch`函数作为第一个参数来调用thunk。 然后可以执行异步代码，并可以调度其他操作
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// 下面的函数称为选择器，它使我们可以从状态中选择一个值。 
// 选择器也可以在使用它们的地方内联定义，而不是在`slice`文件中定义。 
// 例如：`useSelector（（state）=> state.counter.value）`
export const selectCount = state => state.counter.value;

export default counterSlice.reducer;
