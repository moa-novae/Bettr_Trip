	import React from 'react'
	import Example from './example'
	import { DndProvider } from 'react-dnd'
	import Backend from 'react-dnd-html5-backend'

	export default function () {
		return (
			<div className="day-item">
				<DndProvider backend={Backend}>
					<Example />
				</DndProvider>
			</div>
		)
	}