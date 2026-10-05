import { Component, type ReactNode } from 'react'
import BlueprintFallback from './BlueprintFallback'

type Props = { children: ReactNode }
type State = { hasError: boolean }

export default class SceneBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    return this.state.hasError ? <BlueprintFallback /> : this.props.children
  }
}
