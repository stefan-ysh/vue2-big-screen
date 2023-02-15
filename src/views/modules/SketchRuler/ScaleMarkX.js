import './ScaleMarkX.less';
export default {
  name: 'ScaleMarkX',
  functional: true,
  props: {},
  render(h, { props, slots }) {
    return (
      <div style='width: 100%; height: 100%'>
        <table
          cellpadding='0'
          cellspacing='0'
          style='width: 100%; height: 100%'
        >
          <tr>
            {[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24
            ].map((n) => {
              return (
                <td class={`${n === 1 ? 'both-border-x' : 'right-border-x'}`}>
                  <div style='height: 50%' />
                  <div style='width: 100%; height: 50%'>
                    <table
                      cellpadding='0'
                      cellspacing='0'
                      style='width: 100%; height: 100%'
                    >
                      <tr>
                        {[1, 2, 3, 4].map((n) => {
                          return (
                            <td
                              class='right-border-x'
                              style={{ width: n === 1 ? '20%' : '' }}
                            />
                          )
                        })}
                        <td style='border-right: 1px solid transparent' />
                      </tr>
                    </table>
                  </div>
                </td>
              )
            })}
          </tr>
        </table>
      </div>
    )
  },
}
