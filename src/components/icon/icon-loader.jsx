import React from 'react'
import PropTypes from 'prop-types'
import { mapKeys, camelCase, noop, dropRight, last, isFunction, has, get } from 'lodash'

import { Icon } from './icon'

const SLASH = '/'

/**
 * [Zeplin](https://app.zeplin.io/project/59312e1ebdf1da6fc8d37ffb/dashboard?q=elements%20icons)
 * Компонент для вывода svg-иконок
 *
 * @param {Object} props - свойства компонента
 * @return {JSX} - компонент
 */
export class IconLoader extends React.PureComponent {
    static addIcons = (namespace, promise) => {
        if (typeof promise === 'function') {
            IconLoader.namespaces[namespace] = () => promise()
                .then(({ default: defaultExport = {}, ...namedExport } = {}) => {
                    const icons = { ...namedExport, ...defaultExport }

                    IconLoader.namespaces[namespace] = mapKeys(icons, (value, key) => camelCase(key))

                    return icons
                })
        } else {
            IconLoader.namespaces[namespace] = mapKeys(promise, (value, key) => camelCase(key))
        }
    }

    static propTypes = {
        name: PropTypes.string.isRequired,
        onError: PropTypes.func,
        onClick: PropTypes.func
    }

    static defaultProps = {
        size: void 0,
        onError: noop,
        onClick: noop
    }


    componentDidMount () {
        this.loadIcons(this.props)
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        this.loadIcons(nextProps)
    }

    componentWillUnmount () {
        this.unmount = true
    }

    getName = (fullPath) => camelCase(last(fullPath.split(SLASH)))
    getNamespace = (fullPath) => dropRight(fullPath.split(SLASH)).join(SLASH)

    static namespaces = {}

    loadIcons = (props) => {
        const namespace = this.getNamespace(props.name)
        const { onError } = this.props

        if (namespace && isFunction(IconLoader.namespaces[namespace])) {
            IconLoader.namespaces[namespace]()
                .then(() => {
                    if (!this.unmount) {
                        this.iconsLoaded = true
                        this.forceUpdate()
                    }
                }).catch(onError)
        } else {
            onError()
        }
    }

    render () {
        const { name: fullPath, onError } = this.props

        const namespace = this.getNamespace(fullPath)
        const name = this.getName(fullPath)

        if (!has(IconLoader.namespaces, [namespace, name])) {
            if (this.iconsLoaded) {
                onError()
            }

            return null
        }
        const icon = get(IconLoader.namespaces, [namespace, name])

        return (
            <Icon
                {...this.props}
                name={name}
                namespace={namespace}
                icon={icon}
            />
        )
    }
}

