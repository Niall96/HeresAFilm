//
//  Passwordfield.swift
//  HeresAFilm
//
//  Created by Niall Rooney on 06/02/2023.
//

import SwiftUI

struct Passwordfield: View {
    @State var title: String
    @State var description: String
    @Binding var text: String
    var body: some View {
        Text(title)
            .font(.system(size: 13, weight: .light))
            .foregroundColor(.secondary)
            .frame(maxWidth: .infinity,maxHeight: 15, alignment: .leading)
        SecureField(description, text: $text)
            .padding(10)
            .border(Color.blue, width: 5)
            .textInputAutocapitalization(.never)
    }
}

