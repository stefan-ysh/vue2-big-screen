import './ScaleMarkY.less'
export default {
  name: 'ScaleMarkY',
  functional: true,
  render (h, { props, slots }) {
    return <div style='width: 100%; height: 100%'>
      <table cellpadding='0' cellspacing='0' style='width: 100%; height: 100%'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => {
          return <tr >
            <td class={`${i === 1 ? 'both-border-y' : 'bottom-border-y'}`}>
              <div style='width: 50%; height: 100%; float: left' />
              <div style='width: 50%; height: 100%; float: right'>
                <table
                  cellpadding='0'
                  cellspacing='0'
                  style='width: 100%; height: 100%'
                >
                  {[1, 2, 3, 4].map(n => {
                    return <tr>
                      <td class='bottom-border-y' style={{ height: n === 1 ? '20%' : '' }} />
                    </tr>
                  })}
                  <tr>
                    <td style='border-bottom: 1px solid transparent' />
                  </tr>
                </table>
              </div>
            </td>
          </tr>
        })}
      </table>
    </div>
  }
}
